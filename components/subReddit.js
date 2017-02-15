// Parent | Subreddit component containing a list of 'post' components. 
var subreddit = Vue.component('subreddit',{
    template: '#subreddit',
    props: ['name'],

    data: function () {
        return { posts: [] }
    },

    created: function(){
        this.$http.get("https://www.reddit.com/r/"+ this.name +"/top.json?limit=5")
        .then(function(resp){
            if(typeof resp.data == 'string') {
               resp.data = JSON.parse(resp.data);
            }
            this.posts=resp.data.data.children;
        });
    }
});