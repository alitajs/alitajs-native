package com.alitajs.capacitorandroid;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import android.os.Bundle;

public class AlitaJsActivity extends AppCompatActivity {
  private String serverUrl;
  private AlitaJsFragment alitaJsFragment;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_alitajs);
    initData();
    renderWebView();
  }

  public void initData() {
    try {
      Bundle bundle = getIntent().getExtras();
      if (null != bundle) {
        serverUrl = bundle.getString("serverUrl");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void renderWebView() {
    if (alitaJsFragment == null) {
      alitaJsFragment = AlitaJsFragment.newInstance(serverUrl);
      FragmentManager childFragmentManager = getSupportFragmentManager();
      FragmentTransaction transaction = childFragmentManager.beginTransaction();
      transaction.add(R.id.alitajs_container, alitaJsFragment);
      transaction.commitAllowingStateLoss();
    }
  }
}
