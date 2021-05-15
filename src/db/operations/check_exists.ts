import db from '../init_db';

const checkExist= async (collection:string,document:string):Promise<boolean> =>{
    const docRef= await db.collection(collection).doc(document).get();
    return docRef.exists;
}

export default checkExist;