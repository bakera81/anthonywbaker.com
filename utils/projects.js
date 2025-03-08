import { frontmatter as proj1} from '../pages/projects/2048-reinforcement-learning'
import { frontmatter as proj2 } from '../pages/projects/anthonywbaker'
import { frontmatter as proj3 } from '../pages/projects/digital-humanities-literacy-narratives'
import { frontmatter as proj4 } from '../pages/projects/disco'
import { frontmatter as proj5 } from '../pages/projects/exomuscle'
import { frontmatter as proj6 } from '../pages/projects/googhole'
import { frontmatter as proj7 } from '../pages/projects/itunes-scripting'
import { frontmatter as proj8 } from '../pages/projects/judiths-reading-room'
import { frontmatter as proj9 } from '../pages/projects/leap-motion'
import { frontmatter as proj10 } from '../pages/projects/ml-shakespeare-remix'
import { frontmatter as proj11 } from '../pages/projects/pencil-code'
import { frontmatter as proj12 } from '../pages/projects/wine-reviews'
import { frontmatter as proj13 } from '../pages/projects/transform-tangible-coding'
import { frontmatter as proj14 } from '../pages/projects/follower-farming'
import { frontmatter as proj15 } from '../pages/projects/dj-assistant'
import { frontmatter as proj16 } from '../pages/projects/things-on-the-street'
import { frontmatter as proj17 } from '../pages/projects/kink-lamp'

const allProjectMetadata = [
    {...proj1}, {...proj2}, {...proj3}, {...proj4}, {...proj5},
    {...proj6}, {...proj7}, {...proj8}, {...proj9}, {...proj10},
    {...proj11}, {...proj12}, {...proj13}, {...proj14}, {...proj15},
    {...proj16}, {...proj17},
    
].sort((a,b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

export default allProjectMetadata;

export function fetchAllProjectMetadata() {
    const allProjectMetadata = [
        {...proj1}, {...proj2}, {...proj3}, {...proj4}, {...proj5},
        {...proj6}, {...proj7}, {...proj8}, {...proj9}, {...proj10},
        {...proj11}, {...proj12}, {...proj13}, {...proj14}, {...proj15},
        {...proj16}, {...proj17},
    ].sort((a,b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

    return allProjectMetadata;
}