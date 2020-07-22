import React from 'react';

export const handleUpload = async (pendingImage, getUploadUrl,imageType) => {
  //const [pendingImage] = files;
  //console.log(pendingImage);
  //const filename = pendingImage.path;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", imageType);

  await fetch(getUploadUrl.uploadUrl, {
    method: 'put',
    headers: myHeaders,
    body: pendingImage,
    redirect: 'follow'
  }).then(function(data) {
    console.log(data);
  }).catch(function(err){
    console.log(err);
  });
  return getUploadUrl.imageUrl;
}