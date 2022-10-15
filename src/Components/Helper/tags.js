export const TagsGenerator = (value) => {
    let Tags = []
    let i = 0
    while (i < value.length) {
        if (value[i] === '#') {
            let j = i + 1
            while (value[j] !== '#' && value[j] !== ' ' && j < value.length) {
                j++;
            }
            Tags.push(value.substring(i + 1, j));
        }
        i++;
    }
    return Tags;
}