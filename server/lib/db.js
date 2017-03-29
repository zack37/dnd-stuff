import { MongoClient } from 'mongodb';

export default (url) => {
  return MongoClient.connect(url);
};
