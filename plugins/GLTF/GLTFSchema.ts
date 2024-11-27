
export type VEC3 = [number, number, number];
export type VEC4 = [number, number, number, number];

export enum GLTFIdentifier {
    SCALAR = "SCALAR",
    VEC2 = "VEC2",
    VEC3 = "VEC3",
    VEC4 = "VEC4",
    MAT2 = "MAT2",
    MAT3 = "MAT3",
    MAT4 = "MAT4"
}

export enum GLTFComponentType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    UNSIGNED_INT = 5125,
    FLOAT = 5126
}

export interface GLTFBuffer {
    uri: string;
    byteLength: number;
}

export interface GLTFBufferView {
    buffer: number;
    byteOffset?: number;
    byteLength: number;
    target: number;
}

export interface GLTFAccessor {
    bufferView: number;
    byteOffset?: number;
    componentType: GLTFComponentType;
    count: number;
    type: GLTFIdentifier;
}

export interface GLTFAttributes {
    POSITION: number;
    NORMAL?: number;
    TEXCOORD_0?: number;
    COLOR_0?: number;
    COLOR_1?: number;
}

export interface GLTFPrimitive {
    attributes: GLTFAttributes;
    indices: number;
    material?: number;
}

export interface GLTFMesh {
    primitives: GLTFPrimitive[];
    name?: string;
}

export interface GLTFNode {
    mesh?: number;
    name?: string;
    translation?: VEC3;
    rotation?: VEC4; 
    scale?: VEC3;
    children?: number[]; 
}

export interface GLTFPbrMetallicRoughness {
    baseColorFactor?: VEC4;
    metallicFactor?: number;
    metallicRoughnessTexture?: GLTFBaseTexture;
    roughnessFactor?: number;
    baseColorTexture?: GLTFBaseTexture;
}

export interface GLTFMaterial {
    name?: string;
    normalTexture?: GLTFBaseTexture;
    pbrMetallicRoughness?: GLTFPbrMetallicRoughness;
}

export interface GLTFBaseTexture {
    index: number;
    texCoord: number;
}

export interface GLTFAsset {
    version: string;
    generator: string;
}

export interface GLTF {
    asset: GLTFAsset;
    buffers: GLTFBuffer[];
    bufferViews: GLTFBufferView[];
    accessors: GLTFAccessor[];
    meshes: GLTFMesh[];
    nodes: GLTFNode[];
    images: GLTFImage[];
    textures: GLTFTexture[];
    materials: GLTFMaterial[];
}

export interface GLTFTexture {
    sampler: number;
    source: number; 
}

export interface GLTFImage {
    uri: string;            
    mimeType: string; 
    name?: string;
}

export interface GLTFExtensions {
   "KHR_materials_clearcoat":{
					"clearcoatFactor":1,
					"clearcoatRoughnessFactor":0.03999999910593033
				}
}