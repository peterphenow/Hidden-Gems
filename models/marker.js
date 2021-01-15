// Creating our marker model
module.exports = function(sequelize, DataTypes) {
  const Marker = sequelize.define("Marker", {
    markerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The password cannot be null
    markerLatitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    markerLongitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    markerInfo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Marker;
};
