import bcrypt from "bcrypt";

const generateRandomPassword = (teacherName: string) => {
  const randomNumber = Math.floor(1000 + Math.random() * 90000);
  const passwordData = {
    hashversion: bcrypt.hashSync(`${teacherName}_${randomNumber}`, 10),
    plainversion: `${teacherName}${randomNumber}`,
  };
  return passwordData;
};

export default generateRandomPassword;
