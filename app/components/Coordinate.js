const googleMapsClient = require("../common/googleMapsClient");

class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  isEmpty() {
    if (this.latitude == "" || this.longitude == "") {
      return true;
    }
    return false;
  }

  isValid() {
    if (
      typeof this.latitude !== "string" ||
      typeof this.longitude !== "string"
    ) {
      return false;
    } else if (
      isNaN(parseFloat(this.latitude)) ||
      isNaN(parseFloat(this.longitude))
    ) {
      return false
    } else if (
      parseFloat(this.latitude) < -90 ||
      parseFloat(this.latitude) > 90
    ) {
      return false;
    } else if (
      parseFloat(this.longitude) < -180 ||
      parseFloat(this.longitude) > 180
    ) {
      return false;
    }
    return true;
  }

  static async calculateDistance(start, end) {
    const coordinates = {
      origins: {
        lat: start.latitude,
        long: start.longitude
      },
      destinations: {
        lat: end.latitude,
        long: end.longitude
      }
    };
    let distance;
    try {
      const response = await googleMapsClient.distanceMatrix({
        origins: `${coordinates.origins.lat},${coordinates.origins.long}`,
        destinations: `${coordinates.destinations.lat},${coordinates.destinations.long}`,
        mode: 'walking'
      }).asPromise();
      response.json.rows.map((item) => {
        item.elements.map((element) => {
          distance = element.distance;
        });
      });
      return distance.value;
    } catch (error) {
      return null;
    }
  }
}

module.exports = Coordinate;
