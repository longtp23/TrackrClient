export const resize640 = (img)=>{
    return img.replace("/games/", "/resize/640/-/games/")
}
export const resize200 = (img)=>{
    return img.replace("/games/", "/resize/200/-/games/")
}

export const resize200Detail = (img)=>{
    return img.replace("/media/", "/media/resize/200/-/")
}
export const resize640Detail = (img)=>{
    return img.replace("/media/", "/media/resize/640/-/")
}
export const resize1280Detail = (img)=>{
    return img.replace("/media/", "/media/resize/1280/-/")
}