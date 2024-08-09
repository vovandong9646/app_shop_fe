import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import AuthGuard from "src/components/auth/AuthGuard";

const ComponentPreviews = () => {
    return (
      <Previews palette={<PaletteTree />}>
        <ComponentPreview path='/AuthGuard'>
          <AuthGuard />
        </ComponentPreview>
      </Previews>
    )
};

export default ComponentPreviews;