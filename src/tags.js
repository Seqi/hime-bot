let tagStore = function (...tags) {
    this.searchTags = tags,
    this.excludeTags = []

    this.getTags = () => {
        return this.excludeTags.map(tag => `-${tag}`).concat(this.searchTags)
    }

    this.getTagString = () => this.searchTags.concat(this.excludeTags.map(tag => `-${tag}`)).join(', ')
    
    return this
}

module.exports = tagStore