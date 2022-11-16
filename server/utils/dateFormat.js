const date_time = () => {
  const now = new Date();
  const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  const date =
    now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate();

  return `${date}.${time}`;
};

module.exports = date_time;
