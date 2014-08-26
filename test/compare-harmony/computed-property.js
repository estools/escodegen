var object = {
    // MethodDefinition
    get [Symbol.create]() { },
    set [set()](value) { },
    *[generator()]() { },
    *[generator()]() { },

    // Normal Property
    [Symbol.xxx]: 'hello',
    [ok()]: 42,
};
