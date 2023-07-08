const express = require('express');
const shortid = require('shortid'); // shortidパッケージを使用してランダムな短縮URLを生成します
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

// 短縮URLと元のURLのセットを保存するためのオブジェクト
const urlStore = {};

// 短縮URLの生成と元のURLの保存
app.post('/shorten', (req, res) => {
  const { url } = req.body;
  const shortUrl = shortid.generate(); // ランダムな短縮URLを生成します

  urlStore[shortUrl] = url; // 短縮URLと元のURLを関連付けて保存します

  res.json({ shortUrl });
});

// 短縮URLへのリダイレクト
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const url = urlStore[shortUrl];

  if (url) {
    res.redirect(url);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
