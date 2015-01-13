<div id="bg_container">
  <img id="bg" src="img/blur-bg.jpg">
</div>
<div class="bs-example">
  <nav role="navigation" class="navbar navbar-inverse">
    <div class="navbar-header">
      <button type="button" data-target="#collapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/main" class="navbar-brand">
        <img ng-src="{{user.picture}}" style="height: 200%; margin-top: -10px; border-radius:8%;">
      </a>
      <a href="/main" class="navbar-brand" style="margin-left: -10px;">
        {{user.name}}
      </a>
    </div>
    <div id="collapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="/main"><span class="glyphicon glyphicon-home"> Home</span></a></li>
        <li><a ng-click="logout()"><span class="glyphicon glyphicon-log-out"> Logout</span></a></li>
      </ul>
    </div>
  </nav>
  <div>
    <div ng-repeat='i in recommendations'>
      <!--<a href={{i.artistInfo.link}}>{{i.artistInfo.name}}</a>-->
    </div>
  </div>
</div>  