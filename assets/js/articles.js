/*-----------------
   Initialize  
-----------------*/ 

var articles = [
  {id: 1, name: 'Random Image', description: 'Just an image from unsplash', img_url: 'https://unsplash.it/60/100?random'},
  {id: 2, name: 'Ember', description: 'A framework for creating ambitious web applications.', img_url: 100},
  {id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', img_url: 100}
];

function findArticle (articleId) {
  return articles[findarticleKey(articleId)];
};

function findArticleKey (articleId) {
  for (var key = 0; key < articles.length; key++) {
    if (articles[key].id == articleId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#article-list',
  data: function () {
    return {articles: articles, searchKey: ''};
  }
});

var article = Vue.extend({
  template: '#article',
  data: function () {
    return {article: findArticle(this.$route.params.article_id)};
  }
});

var articleEdit = Vue.extend({
  template: '#article-edit',
  data: function () {
    return {article: findArticle(this.$route.params.article_id)};
  },
  methods: {
    updatearticle: function () {
      var article = this.$get('article');
      articles[findarticleKey(article.id)] = {
        id: article.id,
        name: article.name,
        description: article.description,
        price: article.price
      };
      router.go('/');
    }
  }
});

var articleDelete = Vue.extend({
  template: '#article-delete',
  data: function () {
    return {article: findArticle(this.$route.params.article_id)};
  },
  methods: {
    deletearticle: function () {
      articles.splice(findArticleKey(this.$route.params.article_id), 1);
      router.go('/');
    }
  }
});

var Addarticle = Vue.extend({
  template: '#add-article',
  data: function () {
    return {article: {name: '', description: '', price: ''}
    }
  },
  methods: {
    createarticle: function() {
      var article = this.$get('article');
      articles.push({
        id: Math.random().toString().split('.')[1],
        name: article.name,
        description: article.description,
        price: article.price
      });
      router.go('/');
    }
  }
});

var router = new VueRouter();
router.map({
  '/': {component: List},
  '/article/:article_id': {component: article, name: 'article'},
  '/add-article': {component: Addarticle},
  '/article/:article_id/edit': {component: articleEdit, name: 'article-edit'},
  '/article/:article_id/delete': {component: articleDelete, name: 'article-delete'}
})
  .start(Vue.extend({}), '#app');
