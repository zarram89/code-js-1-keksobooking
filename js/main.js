import {generateSimilarPosts} from './data.js';
import {renderCards} from "./cards.js";

const cardsContainer = document.querySelector('#map-canvas');
const posts = generateSimilarPosts();

renderCards(posts, cardsContainer);
