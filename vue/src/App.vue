<template>
  <div>
    <input v-model="originalUrl" type="text" placeholder="Enter URL">
    <button @click="shortenUrl">Shorten</button>
    <br>
    <div v-if="shortenedUrl">
      <p>Shortened URL: <a :href="shortenedUrl">{{ shortenedUrl }}</a></p>
      <p>Original URL: <a :href="originalUrl">{{ originalUrl }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalUrl: '',
      shortenedUrl: ''
    };
  },
  methods: {
    shortenUrl() {
      // バックエンドのAPIエンドポイントにPOSTリクエストを送信して短縮URLを取得します
      fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: this.originalUrl })
      })
      .then(response => response.json())
      .then(data => {
        this.shortenedUrl = `http://localhost:3000/${data.shortUrl}`;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
};
</script>
