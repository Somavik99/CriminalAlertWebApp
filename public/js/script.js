const socket = io();
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", {
         latitude,
       longitude,
      });
    },
    function (err) {
      console.error(err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

L.map("map").setView([0, 0], 10);
