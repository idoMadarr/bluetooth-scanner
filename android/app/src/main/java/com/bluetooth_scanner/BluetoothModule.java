package com.bluetooth_scanner;

import android.content.IntentFilter;
import android.bluetooth.BluetoothDevice;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BluetoothModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private BluetoothReceiver receiver;

    public BluetoothModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "BluetoothModule";
    }

    @ReactMethod
    public void startListening() {
        if (receiver == null) {
            receiver = new BluetoothReceiver(reactContext);
            IntentFilter filter = new IntentFilter();
            filter.addAction(BluetoothDevice.ACTION_ACL_CONNECTED);
            filter.addAction(BluetoothDevice.ACTION_ACL_DISCONNECTED);
            filter.addAction(BluetoothDevice.ACTION_BOND_STATE_CHANGED);
            reactContext.registerReceiver(receiver, filter);
        }
    }

    @ReactMethod
    public void stopListening() {
        if (receiver != null) {
            reactContext.unregisterReceiver(receiver);
            receiver = null;
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN event emitter
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN event emitter
    }
}
