(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,a){e.exports=a(47)},24:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),o=a.n(i),c=(a(24),a(2)),l=a(7),s=a(4),m=a(3),u=a(5);a(25);var d=function(e){var t=e.message?e.message:"Welcome To The Film Festival";return r.a.createElement("header",{className:"headerComponent"},r.a.createElement("h1",null," ",e.title," "),r.a.createElement("h2",null," ",t," "))};var v=function(e){return r.a.createElement("footer",{className:"footerComponent"},r.a.createElement("h1",null," \xa9 This is Toronto Movie Festival 2019."))},p=a(6),h=a.n(p),f=a(10),g=(a(27),a(8)),E=a.n(g),b="d1533d4ca4c407672b61788a01df4c08",w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).SelectedMovie=function(){var e=Object(f.a)(h.a.mark(function e(t,a){var n,r,i,o,c;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=document.getElementById(t),n.hasChildNodes()){e.next=13;break}return e.next=5,E.a.get("https://api.themoviedb.org/3/movie/".concat(t,"/credits"),{params:{api_key:b}});case 5:r=e.sent,i=r.data.cast.map(function(e){e.character,e.id;var t=e.name,a=e.profile_path;if(a)return'<span>\n                            <img src="https://image.tmdb.org/t/p/w66_and_h66_face/'.concat(a,'"\n                            alt="').concat(t,'" title="').concat(t,'"/>\n                        </span>')}),(o=document.createElement("h4")).innerText="Cast:",document.getElementById(t).appendChild(o),(c=document.createElement("div")).innerHTML=i.join(" "),document.getElementById(t).appendChild(c);case 13:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.state={movies:[]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getMovieData()}},{key:"getMovieData",value:function(){var e=Object(f.a)(h.a.mark(function e(){var t,a,n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=[],a=1;case 2:if(!(a<39)){e.next=11;break}return e.next=5,E.a.get("https://api.themoviedb.org/3/trending/movie/day",{params:{api_key:b,language:"en-US",page:a}});case 5:n=e.sent,r=n.data.results,r.filter(function(e){if(2019===new Date(e.release_date).getFullYear()&&"en"==e.original_language)return t.push(e),t});case 8:a++,e.next=2;break;case 11:t.sort(function(e,t){return new Date(e.release_date)-new Date(t.release_date)}),this.setState({movies:t});case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"renderLoader",value:function(){return r.a.createElement("p",null," ...Loading ")}},{key:"renderMovies",value:function(){var e=this;return this.state.movies.map(function(t){var a=t.original_title,n=t.overview,i=t.popularity,o=t.release_date,c=t.poster_path,l=t.id;if(i>10)return r.a.createElement("div",{key:l,className:"movieCard",onClick:function(t){e.SelectedMovie(l,t)}},r.a.createElement("div",{className:"imgDiv"},r.a.createElement("img",{src:"https://image.tmdb.org/t/p/w300_and_h450_bestv2".concat(c),alt:""})),r.a.createElement("div",{className:"contentDiv"},r.a.createElement("h2",{className:"movieName"}," Movie Name: ",a),r.a.createElement("h4",null," Release Date: ",o," "),r.a.createElement("h4",null," Popularity: ",i),r.a.createElement("p",null,r.a.createElement("span",{className:"description"},"Description:")," ",n),r.a.createElement("div",{id:l})))})}},{key:"render",value:function(){return r.a.createElement("section",{className:"movieListComponent"},r.a.createElement("h2",null," -:Here's The List Of Movie:- "),r.a.createElement("div",{className:"movieList"},this.state.movies.length?this.renderMovies():this.renderLoader()),r.a.createElement("input",{type:"button",value:"load more...",onClick:this.loadmore}))}}]),t}(n.Component),k=(n.Component,function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).setSelectedMovie=function(t){e.setState({Selected_Movie_ID:t})},e.state={Selected_Movie_ID:null},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("main",null,r.a.createElement(d,{title:"Toronto International Film Festival"}),r.a.createElement("main",null,r.a.createElement(w,{setSelectedMovie:this.setSelectedMovie})),r.a.createElement(v,null)))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.e8d07a8c.chunk.js.map