export function handleNavLinkClick(hash:string){
    window.location.hash = hash;
};

export function redirectHome(){
    window.location.hash = "";
};