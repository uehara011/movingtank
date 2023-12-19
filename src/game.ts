import { group } from './AREngine'
// Function to move the object based on keyboard input
export function moveObject() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 's':
                group.position.z -= 1;
                break;
            case 'w':
                group.position.z += 1;
                break;
            case 'a':
                group.position.x -= 1;
                break;
            case 'd':
                group.position.x += 1;
                break;
        }
    });
}