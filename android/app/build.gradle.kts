import java.io.File
import java.util.Properties

plugins {
    id("com.android.application")
}

val keystorePropsFile = File(System.getProperty("user.home"), ".cmap-android/keystore.properties");
val hasReleaseKey = keystorePropsFile.exists();

android {
    namespace = "com.chizzywizzy.cmap"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.chizzywizzy.cmap"
        minSdk = 24
        targetSdk = 34
        versionCode = 2
        versionName = "1.1"
    }

    signingConfigs {
        if (hasReleaseKey) {
            create("release") {
                val props = Properties()
                props.load(keystorePropsFile.inputStream())
                storeFile = File(props.getProperty("storeFile"))
                storePassword = props.getProperty("storePassword")
                keyAlias = props.getProperty("keyAlias")
                keyPassword = props.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = if (hasReleaseKey) signingConfigs.getByName("release") else signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.webkit:webkit:1.12.1")
}

// kotlin-stdlib-jdk7/jdk8 (1.6.x, pulled transitively) duplicate classes
// already present in kotlin-stdlib 1.8.x — exclude the superseded artifacts.
configurations.all {
    exclude(group = "org.jetbrains.kotlin", module = "kotlin-stdlib-jdk7")
    exclude(group = "org.jetbrains.kotlin", module = "kotlin-stdlib-jdk8")
}
