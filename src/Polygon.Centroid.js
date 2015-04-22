// TODO: dismiss that on Leaflet 0.8.x release

L.Polygon.include( /** @lends L.Polygon.prototype */ {

  /**
   * @return {L.LatLng}
   */
  getCenter: function() {
    var i, j, len, p1, p2, f, area, x, y;
    
    var getX, getY;
    if(this._map) {

      points = this._parts[0];
      getX = function(point) { return point.x };
      getY = function(point) { return point.y};
    } else {

      points = this._latlngs;
      getX = function(point) { return point.lng };
      getY = function(point) { return point.lat};
    }

    // polygon centroid algorithm; only uses the first ring if there are multiple

    area = x = y = 0;

    for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
      p1 = points[i];
      p2 = points[j];

      f = getY(p1) * getX(p2) - getY(p2) * getX(p1);
      x += (getX(p1) + getX(p2)) * f;
      y += (getY(p1) + getY(p2)) * f;
      area += f * 3;
    }
    
    x = x / area;
    y = y / area;

    if(this._map)
      return this._map.layerPointToLatLng([x, y]);
    else
      return L.latLng([y, x]);
  }

});
