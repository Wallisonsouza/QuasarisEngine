export class WebGlBufferCreationError extends Error {
    constructor(bufferType: string, message: string) {
        super(`Erro ao criar o buffer de ${bufferType}: ${message}`);
        this.name = "BufferCreationError";
    }
}

export class WebGl2BufferCreationError extends Error {
    constructor(
        methodName: string,
        target: number,
        usage: number,
        additionalMessage: string,
        originalError?: Error
    ) {
        const message = `Erro no método ${methodName}. Target: ${target}, Usage: ${usage}. ${additionalMessage}` +
                        (originalError ? ` Detalhes do erro original: ${originalError.message}` : '');
        super(message);
        this.name = "WebGl2BufferCreationError";
        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}


export class WebGpuBufferCreationError extends Error {
    constructor(bufferType: string, message: string) {
        super(`Erro ao criar o buffer de ${bufferType}: ${message}`);
        this.name = "BufferCreationError";
    }
}

export class WebGl2ShaderCreationError extends Error {
    constructor(shaderType: string, message: string) {
        super(message);
        this.name = "WebGl2ShaderCreationError";
        this.message = `Tipo de Shader: ${shaderType} - ${message}`;
    }
}

export class ShaderError extends Error {
    constructor(
        methodName: string,
        target: number,
        usage: number,
        additionalMessage: string,
        originalError?: Error
    ) {
        const message = `Erro no método ${methodName}. Target: ${target}, Usage: ${usage}. ${additionalMessage}` +
                        (originalError ? ` Detalhes do erro original: ${originalError.message}` : '');
        super(message);
        this.name = "WebGl2BufferCreationError";
        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}

export class NullReferenceException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NullReferenceException";
        this.message = `${message}`;
    }
}

export class ComponentAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DuplicateComponentException";
        this.message = `${message}`;
    }
}