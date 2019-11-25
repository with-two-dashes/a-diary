bool inBox(highp vec2 lo, highp vec2 hi, highp vec2 p) {
  if((p.x > lo.x && p.y > lo.y) && (p.x < hi.x && p.y < hi.y)){
    return true;
  }else{
    return false;
  }
}

//Do not change this line or the name of the above function
#pragma glslify: export(inBox)
