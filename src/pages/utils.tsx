export function handleNavLinkClick(hash:string){
    window.location.hash = hash;
};

export function redirectHome(){
    window.location.hash = "";
};

export function formatDate(date:Date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}