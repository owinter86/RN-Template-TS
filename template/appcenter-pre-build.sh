#!/bin/bash

echo "Running appcenter-pre-build.sh"

# Set the build number on android and iOS
BUILD_NUMBER=$(git show -s --format=%ct)
echo "Setting build number to $BUILD_NUMBER"
sed -i '' 's/versionCode=.*/versionCode='$BUILD_NUMBER'/' android/gradle.properties
plutil -replace CFBundleVersion -string $BUILD_NUMBER ios/LightbaseTemplate/Info.plist

# Set the correct ENVFILE based on the current branch for ios (android managed by gradle)
if [ "$APPCENTER_BRANCH" == "production" ]; then
    plutil -replace CFBundleIdentifier -string com.lightbasetemplate ios/LightbaseTemplate/Info.plist
    cp .env.production .env
elif [ "$APPCENTER_BRANCH" == "sprint" ]; then
    plutil -replace CFBundleIdentifier -string com.lightbasetemplate.staging ios/LightbaseTemplate/Info.plist
    cp .env.staging .env
else
    cp .env.staging .env
fi
echo 'BUILD_NUMBER='$BUILD_NUMBER'' >> .env
cat .env