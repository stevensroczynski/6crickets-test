import { ClassCast, copyArray, copyObject } from "typescript-object-helper";

class RangeValues {
  min: number = 0;
  max: number = 0;
}

class CameraSpecs {
  @ClassCast(RangeValues)
  distanceRange: RangeValues = new RangeValues();
  @ClassCast(RangeValues)
  lightLevelRange: RangeValues = new RangeValues();
}
// Sticking this extra code here as per recruiter request.
export function canCoverDesiredRange(
  desiredDistanceRange: RangeValues,
  desiredLightLevelRange: RangeValues,
  hardwareCameras: CameraSpecs[]
): boolean {
  let distanceCovered = false;
  let lightLevelCovered = false;

  for (const camera of hardwareCameras) {
    if (
      camera.distanceRange.min <= desiredDistanceRange.min &&
      camera.distanceRange.max >= desiredDistanceRange.max
    ) {
      distanceCovered = true;
    }

    if (
      camera.lightLevelRange.min <= desiredLightLevelRange.min &&
      camera.lightLevelRange.max >= desiredLightLevelRange.max
    ) {
      lightLevelCovered = true;
    }

    if (distanceCovered && lightLevelCovered) {
      return true;
    }
  }

  return distanceCovered && lightLevelCovered;
}

// Example usage:
const desiredDistanceRange = copyObject({ min: 1, max: 10 }, RangeValues);
const desiredLightLevelRange = copyObject({ min: 100, max: 1000 }, RangeValues);

const hardwareCameras: CameraSpecs[] = copyArray(
  [
    {
      distanceRange: {
        min: 0,
        max: 5,
      },
      lightLevelRange: {
        min: 50,
        max: 500,
      },
    },
    {
      distanceRange: {
        min: 5,
        max: 15,
      },
      lightLevelRange: {
        min: 500,
        max: 1500,
      },
    },
  ],
  CameraSpecs
);
