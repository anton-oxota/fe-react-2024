function cn(initialClass: string, classes: string | string[] | undefined) {
    let classesString = initialClass;

    if (!classes) {
        return classesString;
    }

    if (Array.isArray(classes)) {
        for (const className of classes) {
            classesString += ` ${className}`;
        }
    } else {
        classesString += ` ${classes}`;
    }

    return classesString;
}

export { cn };
