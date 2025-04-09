export function groupBlocksByCategory(blocks) {
  const result = [];
  let currentCategory = null;
  let currentBlocks = [];
  
  // Function to collapse all blocks on a page into a list per H2
  blocks.forEach(block => {
    // Check if this is a heading_2 block
    if (block.type === "heading_2") {
      // If we already have a category, push the current group to the result
      if (currentCategory) {
        result.push({
          category: currentCategory,
          blocks: currentBlocks
        });
      }
      
      // Start a new category
      currentCategory = block.heading_2.rich_text[0].plain_text;
      currentBlocks = [];
    } else if (currentCategory) {
      // Add this block to the current category's blocks
      currentBlocks.push(block);
    }
  });
  
  // Don't forget to add the last category
  if (currentCategory) {
    result.push({
      category: currentCategory,
      blocks: currentBlocks
    });
  }
  
  return result;
}

// Example usage:
// const formattedBlocks = reformatNotionBlocks(yourNotionBlocksArray);
// console.log(JSON.stringify(formattedBlocks, null, 2));