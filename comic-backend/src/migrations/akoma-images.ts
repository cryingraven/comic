import { PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import { StorageService } from 'src/services/storage.service';
export async function akoma_images(storage: StorageService, mongoUrl: string) {
  const client = new MongoClient(mongoUrl);
  console.log('Connecting to MongoDB...');
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db('paras-comic-mainnet');
  const comicCollection = db.collection('comics');
  const chapterCollection = db.collection('chapters');

  const baseUrl = 'https://paras-ipfs.paras.id';

  const comics = await comicCollection
    .find({
      // comic_id: 'atma',
    })
    .toArray();
  for (const comic of comics) {
    await Promise.all([
      saveImageFromWeb(baseUrl, comic.media, storage),
      saveImageFromWeb(baseUrl, comic.media_cover, storage),
      saveImageFromWeb(baseUrl, comic.media_banner, storage),
    ]);

    const chapters = await chapterCollection
      .find({ 'metadata.comic_id': comic.comic_id })
      .toArray();
    for (const chapter of chapters) {
      await Promise.all([
        saveImageFromWeb(baseUrl, chapter.metadata.media_thumb || '', storage),
      ]);
    }
  }

  process.exit(0);
}

async function saveImageFromWeb(
  baseUrl: string,
  path: string,
  storage: StorageService,
) {
  try {
    console.log(`Downloading image from ${baseUrl}/${path}`);
    const image = await downloadImage(`${baseUrl}/${path}`);
    console.log(`Uploading image to ${path}`);
    await upload(storage, image.data, path, image.headers['content-type']);
  } catch (e) {
    console.log(e);
  }
}

async function downloadImage(url: string) {
  return await axios.get(url, {
    responseType: 'arraybuffer',
  });
}

async function upload(
  storage: StorageService,
  image: Buffer,
  path: string,
  mimetype: string,
) {
  await storage.saveFile(path, image, mimetype);

  return path;
}
