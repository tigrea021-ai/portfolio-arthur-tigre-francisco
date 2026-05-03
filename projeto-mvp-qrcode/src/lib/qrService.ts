import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { type QRSettings } from './types';

export interface SavedQRCode {
  id: string;
  name: string;
  settings: QRSettings;
  image?: string;
  ownerId: string;
  createdAt: any;
}

export const saveQRCode = async (userId: string, name: string, settings: QRSettings, image?: string) => {
  return await addDoc(collection(db, 'qrcodes'), {
    ownerId: userId,
    name,
    settings,
    image,
    createdAt: serverTimestamp(),
  });
};

export const deleteQRCode = async (id: string) => {
  return await deleteDoc(doc(db, 'qrcodes', id));
};

export const subscribeToHistory = (userId: string, callback: (qrs: SavedQRCode[]) => void) => {
  const q = query(
    collection(db, 'qrcodes'),
    where('ownerId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const qrs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SavedQRCode[];
    callback(qrs);
  });
};
