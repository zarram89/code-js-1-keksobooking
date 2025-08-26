import {generateSimilarPosts} from './data.js';
import {renderCards} from './cards.js';
import {setInactiveState, setActiveState} from './form.js';

const cardsContainer = document.querySelector('#map-canvas');
const posts = generateSimilarPosts();

renderCards(posts, cardsContainer);

setInactiveState();
setActiveState();
