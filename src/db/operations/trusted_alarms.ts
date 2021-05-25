import db, { ArrayUpdate, ArrayRemove } from '../init_db';

const addTrusted = async (trustedByUid: string, trustingUid: string) => {
  const batch = db.batch();
  const trustedByRef = db.collection('users').doc(trustedByUid);
  const trustingRef = db.collection('users').doc(trustingUid);
  batch.update(trustingRef, {
    trusted_by: ArrayUpdate(trustedByUid),
  });
  batch.update(trustedByRef, {
    trusting: ArrayUpdate(trustingUid),
  });
  return batch.commit().then(
    () =>
      JSON.stringify({
        success: true,
      }),
    (_err) => {
      console.log(_err);
      return JSON.stringify({
        success: false,
      });
    },
  );
};

const getTrusted = async (trustingUid: string): Promise<string[]> => {
  const userData = await db.collection('users').doc(trustingUid).get();
  return userData.get('trusted_by');
};

export default addTrusted;
export { getTrusted };
