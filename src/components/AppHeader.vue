<template>
<header class="row light-green accent-4">
<div  id="banner">
            <img class="col s3 m3 l1 responsive-img" src="/static/images/LOGO-white.png" />
            <h2 class="col s3 m3 l1 white-text">Dashboard</h2>
            <div class="col s6 l10"></div>
        </div>
  <nav>
    <ul id="menu" class="light-green accent-4">
      <li><router-link to="/" class="white-text">Statistics</router-link></li>
      <li><router-link class="white-text" to="/graphs">Graph</router-link></li>
      <li><a class="white-text" href="https://myrentie.com">Main Website</a></li>
    </ul>	
  </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style>
/*Strip the ul of padding and list styling*/
.clear {
  float: clear;
}
nav {
  display: grid;
  margin-top: 0;
}

#banner {
  max-height: 300px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/*Create a horizontal list with spacing*/
li {
  display: inline-block;
  float: left;
  margin-right: 1px;
}
/*Style for menu links*/
li a {
  display: block;
  margin-right: 20px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #666;
}
/*Active color*/
li a.active {
}
/*Hover state for top level links*/
li:hover a {
}
</style>