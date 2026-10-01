export class ResourceTracker {
  constructor() {
    this.resources = new Set();
  }

  track(resource) {
    if (!resource) return resource;

    if (Array.isArray(resource)) {
      resource.forEach((item) => this.track(item));
      return resource;
    }

    if (resource.dispose || resource.isObject3D) {
      this.resources.add(resource);
    }

    return resource;
  }

  untrack(resource) {
    this.resources.delete(resource);
  }

  dispose() {
    for (const resource of this.resources) {
      if (resource.isObject3D && resource.parent) {
        resource.parent.remove(resource);
      }

      if (Array.isArray(resource.material)) {
        resource.material.forEach((material) => material.dispose?.());
      } else {
        resource.material?.dispose?.();
      }

      resource.geometry?.dispose?.();
      resource.dispose?.();
    }

    this.resources.clear();
  }
}
