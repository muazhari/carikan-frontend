package com.carikan;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.photoview.PhotoViewPackage;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.maps.MapsPackage;
import org.reactnative.camera.RNCameraPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
import com.sha256lib.Sha256Package;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
// import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
// import io.invertase.firebase.admob.RNFirebaseAdMobPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new PhotoViewPackage(),
            new SvgPackage(),
            new MapsPackage(),
            new RNCameraPackage(),
            new RNSecureRandomPackage(),
            new Sha256Package(),
            new RNGoogleSigninPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseAnalyticsPackage(),

            // new RNFirebaseMessagingPackage(),
            // new RNFirebaseFunctionsPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseLinksPackage(),
            // new RNFirebaseInstanceIdPackage(),
            // new RNFirebaseNotificationsPackage(),
            // new RNFirebaseRemoteConfigPackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebasePerformancePackage()
            // new RNFirebaseAdMobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
