import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
    name: "KhaoGalli",
    slug: "KhaoGalliUser",
    version: "1.0.1",
    orientation: "default",
    icon: "./assets/download1.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/download1.png",
      resizeMode: "contain",
      backgroundColor: "#eeca74"
    },
    scheme: "khaogalli",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,  
      adaptiveIcon: {
        foregroundImage: "./assets/download1.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ],
      package: "me.khaogalli.user"
    },
    web: {
      favicon: "./assets/download1.png"
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true
          }
        }
      ],
      "expo-asset"
    ],
    extra: {
      eas: {
        projectId: "cbbbbac4-8082-4b84-9522-78dc283f1da9"
      }
    }
  
};

export default config;
