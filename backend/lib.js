function generateUniqueSlug(title) {
    const now = Date.now();
    const smallTitle = title.toLowerCase();

    const hyphens = smallTitle.replace(/\s+/g, "-");
    const result = hyphens.replace(/[~!@#$%^&*?()_+=`{}[]|:;',.?]/g, "");

    return `${result}-${now}`;
}

module.exports = generateUniqueSlug;
