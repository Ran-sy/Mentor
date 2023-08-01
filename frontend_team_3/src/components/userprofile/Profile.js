import React, { useEffect, useState } from 'react';

function Profile() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch('../../../public/profile/index.html')
      .then((response) => response.text())
      .then((data) => setFileContent(data))
      .catch((error) => console.error(error));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: fileContent }} />;
}

export default Profile;