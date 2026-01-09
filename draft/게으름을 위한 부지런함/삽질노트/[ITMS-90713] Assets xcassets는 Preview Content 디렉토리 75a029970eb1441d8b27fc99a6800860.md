# [ITMS-90713] Assets.xcassets는 Preview Content 디렉토리에 넣지 마라.

# 현상

App Store Connect에 빌드를 업로드하면 빌드를 올릴수 없다는 이메일을 받게 됨.

```
**App Store Connect: Your app {AppInfo} has one or more issues**

ITMS-90713: Missing Info.plist value - A value for the Info.plist key 'CFBundleIconName' is missing in the bundle 'com.krgoodnews.FakeSayingApp'. Apps built with iOS 11 or later SDK must supply app icons in an asset catalog and must also provide a value for this Info.plist key. For more information see [http://help.apple.com/xcode/mac/current/#/dev10510b1f7](http://help.apple.com/xcode/mac/current/#/dev10510b1f7)
```

- 앱의 로컬빌드에는 AppIcon이 정상적으로 노출됨
- Info.plist에는 `CFBundleIconName` 값이 설정되어 있음

# 원인

![Untitled](%5BITMS-90713%5D%20Assets%20xcassets%EB%8A%94%20Preview%20Content%20%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC/Untitled.png)

프로젝트 생성시 기본적으로 생성되는 `Assets.xcassets`을 임의로 Preview Content 디렉토리로 옮겨놓아서 발생한 이슈

# 해결법

`Assets.xcassets`을 상위 디렉토리로 이동하니 해결됨.