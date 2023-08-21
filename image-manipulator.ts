class ImageManipulator {
    private imageData: number[][];
    private width: number;
    private height: number;

    constructor(imageData: number[][], width: number, height: number) {
        this.imageData = imageData;
        this.width = width;
        this.height = height;
    }

    private isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    getPixel(x: number, y: number): number[] {
        if (!this.isValidCoordinate(x, y)) {
            throw new Error("Invalid coordinates");
        }
        return this.imageData[y][x];
    }

    setPixel(x: number, y: number, rgb: number[]): void {
        if (!this.isValidCoordinate(x, y) || rgb.length !== 3) {
            throw new Error("Invalid coordinates or RGB values");
        }
        this.imageData[y][x] = rgb.map(val => this.clamp(val, 0, 255));
    }

    resize(newWidth: number, newHeight: number): void {
        const newImageData: number[][] = [];

        for (let y = 0; y < newHeight; y++) {
            const newRow: number[] = [];
            for (let x = 0; x < newWidth; x++) {
                const sourceX = Math.floor(x * (this.width / newWidth));
                const sourceY = Math.floor(y * (this.height / newHeight));
                newRow.push(this.getPixel(sourceX, sourceY));
            }
            newImageData.push(newRow);
        }

        this.imageData = newImageData;
        this.width = newWidth;
        this.height = newHeight;
    }

    applyFilter(filter: number[][]): void {
        const filterSize = filter.length;
        const filterOffset = Math.floor(filterSize / 2);

        const newImageData: number[][] = [];

        for (let y = 0; y < this.height; y++) {
            const newRow: number[] = [];
            for (let x = 0; x < this.width; x++) {
                let [r, g, b] = [0, 0, 0];

                for (let fy = 0; fy < filterSize; fy++) {
                    for (let fx = 0; fx < filterSize; fx++) {
                        const sourceX = x + fx - filterOffset;
                        const sourceY = y + fy - filterOffset;

                        if (this.isValidCoordinate(sourceX, sourceY)) {
                            const filterValue = filter[fy][fx];
                            const [fr, fg, fb] = this.getPixel(sourceX, sourceY);
                            r += fr * filterValue;
                            g += fg * filterValue;
                            b += fb * filterValue;
                        }
                    }
                }

                newRow.push([r, g, b]);
            }
            newImageData.push(newRow);
        }

        this.imageData = newImageData;
    }

    rotate(degrees: number): void {
        const radians = (degrees * Math.PI) / 180;
        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);

        const newImageData: number[][] = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const centerX = this.width / 2;
                const centerY = this.height / 2;

                const xOffset = x - centerX;
                const yOffset = y - centerY;

                const rotatedX = Math.round(centerX + xOffset * cosTheta - yOffset * sinTheta);
                const rotatedY = Math.round(centerY + xOffset * sinTheta + yOffset * cosTheta);

                if (this.isValidCoordinate(rotatedX, rotatedY)) {
                    newImageData[rotatedY][rotatedX] = this.imageData[y][x];
                }
            }
        }

        this.imageData = newImageData;
    }
}
