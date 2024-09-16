import { DefaultValues } from "../../main";
import Vector3 from "../../../engine_modules/vectors/Vector3";
import Color from "../static/color";
import Mesh, { WebGL2Api } from "./Mesh";
import ServiceLocator, { DefaultServicesLocator as DefaultServices } from "./ServiceLocator";
import { IRenderingApi } from "../../global";
import Quaternion from "../../../engine_modules/vectors/Quaternion";
import Matrix4x4 from "../../../engine_modules/matrices/Matrix4x4";
import { Shader } from "../../Shader/Shader";
import Camera from "../../Inplementations/Camera";

export default class Gizmos {

    public static color: Color = Color.white;
    
    private static getApiAndCamera(): [IRenderingApi, Camera] {
        const api = ServiceLocator.get<IRenderingApi>('RenderingApi');
        const camera = ServiceLocator.get<Camera>('ActiveCamera');
        return [api, camera];
    }

    public static drawLine(start: Vector3, end: Vector3) {
        const [api, camera] = this.getApiAndCamera();
    
        if(api instanceof WebGL2Api) {
            DrawWebGL2.drawLine(api.context, camera, start, end, this.color);
        } else {
            console.error("API não reconhecida");
        }
    }

    public static drawWireCube(center: Vector3, size: Vector3, rotation: Quaternion) {
        const [api, camera] = this.getApiAndCamera();
    
        if(api instanceof WebGL2Api) {
            DrawWebGL2.drawWireCube(api.context, camera, center, size, rotation, this.color);
        } else {
            console.error("API não reconhecida");
        }
    }
}

export class DrawWebGL2 {
    private static vertexBuffer: WebGLBuffer | null = null;
    private static indexBuffer: WebGLBuffer | null = null;
    private static lineVertices: Float32Array = new Float32Array();
    private static lineIndices = new Uint16Array([0, 1]);

    private static initializeBuffers(gl2: WebGL2RenderingContext): void {
        if (!this.vertexBuffer) {
            this.vertexBuffer = gl2.createBuffer();
        }
        if (!this.indexBuffer) {
            this.indexBuffer = gl2.createBuffer();
        }
    }

    public static drawLine(gl2: WebGL2RenderingContext, camera: Camera, start: Vector3, end: Vector3, color: Color): void {
        this.lineVertices = new Float32Array([
            start.x, start.y, start.z,
            end.x, end.y, end.z
        ]);

        this.initializeBuffers(gl2);

        gl2.bindBuffer(gl2.ARRAY_BUFFER, this.vertexBuffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, this.lineVertices, gl2.DYNAMIC_DRAW); 

        gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, this.lineIndices, gl2.STATIC_DRAW);

        const shader = DefaultValues.lineShader2D;
        shader.use();

        shader.enableAttribute3f(gl2, "a_position");
        shader.setUniformMatrix4fv("u_modelMatrix", Matrix4x4.identity());
        shader.setUniformMatrix4fv("u_viewMatrix", camera.worldCameraMatrix);
        shader.setUniformMatrix4fv("u_projectionMatrix", camera.projectionMatrix);
        shader.setUniform4fv("u_color", color.toArray());

        gl2.disable(gl2.DEPTH_TEST);
        gl2.drawElements(gl2.LINES, 2, gl2.UNSIGNED_SHORT, 0);

        gl2.bindBuffer(gl2.ARRAY_BUFFER, null);
        gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, null);
    }

    public static drawWireCube(gl2: WebGL2RenderingContext, camera: Camera, center: Vector3, size: Vector3, rotation: Quaternion, color: Color): void {
       
        const mesh = ServiceLocator.get<Mesh>(DefaultServices.CubeMesh);
        const shader = ServiceLocator.get<Shader>(DefaultServices.LineShader);

        if (!mesh.indices || !mesh.vertexBuffer || !mesh.indexBuffer) return;

        gl2.bindBuffer(gl2.ARRAY_BUFFER, mesh.vertexBuffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, mesh.vertices, gl2.STATIC_DRAW);

        gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, mesh.indices, gl2.STATIC_DRAW);
      
        shader.use();

        shader.enableAttribute3f(gl2, "a_position");
        shader.setUniformMatrix4fv("u_modelMatrix", Matrix4x4.createModelMatrix(center, rotation, size));
        shader.setUniformMatrix4fv("u_viewMatrix", camera.worldCameraMatrix);
        shader.setUniformMatrix4fv("u_projectionMatrix", camera.projectionMatrix);
        shader.setUniform4fv("u_color", color.toArray());

        gl2.disable(gl2.DEPTH_TEST);
        gl2.drawElements(gl2.LINES, mesh.indices.length, gl2.UNSIGNED_SHORT, 0);

        gl2.bindBuffer(gl2.ARRAY_BUFFER, null);
        gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, null);
    }
}