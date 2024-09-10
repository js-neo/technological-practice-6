class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        return this.has(key) ? super.get(key) : this.defaultValue;
    }
}

class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    add(text) {
        text = text.replace(/[.,!? ]/g, "").toUpperCase();

        this.letterCounts = Array.from(text).reduce((acc, cur) => {
            let count = acc.get(cur);
            acc.set(cur, count + 1);
            this.totalLetters++;
            return acc;
        }, this.letterCounts);
    }

    generateHistogramStrings() {
        return [...this.letterCounts]
            .sort(([aChar, aCount], [bChar, bCount]) =>
                aCount === bCount ? aChar.localeCompare(bChar) : bCount - aCount
            )
            .reduce((acc, [char, count]) => {
                count = (count / this.totalLetters) * 100;
                if (count >= 1) {
                    acc.push(
                        `${char}: ${"#".repeat(Math.round(count))} ${count.toFixed(2)}%`
                    );
                }
                return acc;
            }, []);
    }
}

export { Histogram };
