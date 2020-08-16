# Generate sourcemaps for Bugsnag
BUILD_NUMBER=$(git show -s --format=%ct)
VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" ios/blox/info.plist)
export $(egrep -v '^#' .env | xargs)

# Android source maps are pre build with hermes as the target JS engine
# Native crashes do not have codebundleid attached for android - https://github.com/bugsnag/bugsnag-react-native/issues/267
# So we upload two sourcemaps for android code-bundle-id allows for distinction between codepush JS and original JS crashes
if [ "$PLATFORM_TYPE" == "ANDROID" ]; then    
    echo "Uploading Android Source Maps..."
    npx bugsnag-sourcemaps upload \
    --api-key=$BUGSNAG_API \
    --code-bundle-id=$BUILD_NUMBER \
    --appVersion=$VERSION \
    --minifiedFile=android/app/build/generated/assets/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle \
    --source-map=android/app/build/generated/sourcemaps/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle.map \
    --minified-url=index.android.bundle \
    --upload-sources \
    --add-wildcard-prefix \
    --overwrite=true 
    npx bugsnag-sourcemaps upload \
    --api-key=$BUGSNAG_API \
    --appVersion=$VERSION \
    --minifiedFile=android/app/build/generated/assets/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle \
    --source-map=android/app/build/generated/sourcemaps/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle.map \
    --minified-url=index.android.bundle \
    --add-wildcard-prefix \
    --overwrite=true \
    --upload-sources

else 
    echo "Creating iOS Source Maps..."
    npx react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map
    echo "Uploading iOS Source Maps..."
    npx bugsnag-sourcemaps upload \
    --api-key=$BUGSNAG_API \
    --code-bundle-id=$BUILD_NUMBER \
    --minified-file ios-release.bundle \
    --source-map ios-release.bundle.map \
    --minified-url main.jsbundle \
    --upload-sources \
    --add-wildcard-prefix \
    --overwrite=true 
fi