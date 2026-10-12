package com.chizzywizzy.cmap;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

/** Hosts the CMAP PWA (https://neducmap-1207.netlify.app). Requires internet. */
public class MainActivity extends AppCompatActivity {
    private static final String HOME = "https://neducmap-1207.netlify.app/";
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Swap splash theme for the regular theme before super.onCreate.
        setTheme(R.style.Theme_CMAP);
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(true);
        web.setWebViewClient(new WebViewClient());
        setContentView(web);

        if (savedInstanceState == null) {
            web.loadUrl(HOME);
        } else {
            web.restoreState(savedInstanceState);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        web.saveState(outState);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
