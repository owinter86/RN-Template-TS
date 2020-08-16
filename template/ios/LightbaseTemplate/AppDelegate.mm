#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <CodePush/CodePush.h>
#import <BugsnagReactNative/BugsnagReactNative.h>

#import "RNBootSplash.h"

// unimodules
#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

//reanimatedV2
#import <React/RCTCxxBridgeDelegate.h>
#import <ReactCommon/RCTTurboModuleManager.h>
// reanimatedV2 headers (start)
#import <React/RCTDataRequestHandler.h>
#import <React/RCTFileRequestHandler.h>
#import <React/RCTHTTPRequestHandler.h>
#import <React/RCTNetworking.h>
#import <React/RCTLocalAssetImageLoader.h>
#import <React/RCTGIFImageDecoder.h>
#import <React/RCTImageLoader.h>
#import <React/JSCExecutorFactory.h>
#import <RNReanimated/RETurboModuleProvider.h>
#import <RNReanimated/REAModule.h>
// add headers (end)

#if DEBUG
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@interface AppDelegate() <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
    RCTTurboModuleManager *_turboModuleManager;
}
@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;

@end

@implementation AppDelegate // changes should be made within AppDelegate's implementation

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  // reanimatedV2
  RCTEnableTurboModule(YES);
  
  #if DEBUG
    InitializeFlipper(application);
  #endif

  // https://docs.bugsnag.com/platforms/react-native/react-native/enhanced-native-integration/#native-configuration
  [BugsnagReactNative start];

  // unimodules
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"LightbaseTemplate"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // https://github.com/zoontek/react-native-bootsplash
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // <- initialization using the storyboard file name

  return YES;
}

// unimodules
- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
    NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
    // If you'd like to export some custom RCTBridgeModules that are not Expo modules, add them here!
    return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // $CUSTOM: use the codepush bundledURL
  return [CodePush bundleURL];
#endif
}

// reanimatedV2
- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _bridge_reanimated = bridge;
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                              delegate:self
                                                             jsInvoker:bridge.jsCallInvoker];
 #if RCT_DEV
  [_turboModuleManager moduleForName:"RCTDevMenu"]; // <- add
 #endif
 __weak __typeof(self) weakSelf = self;
 return std::make_unique<facebook::react::JSCExecutorFactory>([weakSelf, bridge](facebook::jsi::Runtime &runtime) {
   if (!bridge) {
     return;
   }
   __typeof(self) strongSelf = weakSelf;
   if (strongSelf) {
     [strongSelf->_turboModuleManager installJSBindingWithRuntime:&runtime];
   }
 });
}

- (Class)getModuleClassFromName:(const char *)name
{
 return facebook::react::RETurboModuleClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
 return facebook::react::RETurboModuleProvider(name, jsInvoker);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      instance:(id<RCTTurboModule>)instance
                                                     jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
 return facebook::react::RETurboModuleProvider(name, instance, jsInvoker);
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
 if (moduleClass == RCTImageLoader.class) {
   return [[moduleClass alloc] initWithRedirectDelegate:nil loadersProvider:^NSArray<id<RCTImageURLLoader>> *{
     return @[[RCTLocalAssetImageLoader new]];
   } decodersProvider:^NSArray<id<RCTImageDataDecoder>> *{
     return @[[RCTGIFImageDecoder new]];
   }];
 } else if (moduleClass == RCTNetworking.class) {
   return [[moduleClass alloc] initWithHandlersProvider:^NSArray<id<RCTURLRequestHandler>> *{
     return @[
       [RCTHTTPRequestHandler new],
       [RCTDataRequestHandler new],
       [RCTFileRequestHandler new],
     ];
   }];
 }
 return [moduleClass new];
}

@end

