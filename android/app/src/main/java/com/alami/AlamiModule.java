package com.alami;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import android.provider.Settings;



public class AlamiModule extends ReactContextBaseJavaModule {
    AlamiModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AlamiModule";
    }

    @ReactMethod
    public void getDeviceId(Callback cb) {
        cb.invoke(Settings.Secure.getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID));
    }
}