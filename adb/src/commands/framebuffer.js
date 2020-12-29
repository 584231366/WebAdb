/*
 * @Author: Sphantix Hang
 * @date: 2020-12-26 13:10:40
 * @last_author: Sphantix Hang
 * @last_edit_time: 2020-12-28 17:18:58
 * @file_path: /webadb/adb/src/commands/framebuffer.js
 */
import { Struct } from "../struct/index";
import { AdbBufferedStream } from '../stream/index';
const Version = new Struct({ littleEndian: true }).uint32('version');
/*
 * ADB uses 8 int32 fields to describe bit depths
 * The only combination I have seen is RGBA8888, which is
 *   red_offset:   0
 *   red_length:   8
 *   blue_offset:  16
 *   blue_length:  8
 *   green_offset: 8
 *   green_length: 8
 *   alpha_offset: 24
 *   alpha_length: 8
 */
export const AdbFrameBufferV1 = new Struct({ littleEndian: true })
    .uint32('bpp')
    .uint32('size')
    .uint32('width')
    .uint32('height')
    .uint32('red_offset')
    .uint32('red_length')
    .uint32('blue_offset')
    .uint32('blue_length')
    .uint32('green_offset')
    .uint32('green_length')
    .uint32('alpha_offset')
    .uint32('alpha_length')
    .arrayBuffer('data', { lengthField: 'size' });
export const AdbFrameBufferV2 = new Struct({ littleEndian: true })
    .uint32('bpp')
    .uint32('colorSpace')
    .uint32('size')
    .uint32('width')
    .uint32('height')
    .uint32('red_offset')
    .uint32('red_length')
    .uint32('blue_offset')
    .uint32('blue_length')
    .uint32('green_offset')
    .uint32('green_length')
    .uint32('alpha_offset')
    .uint32('alpha_length')
    .arrayBuffer('data', { lengthField: 'size' });
export async function framebuffer(adb) {
    const stream = await adb.createStream('framebuffer:');
    const buffered = new AdbBufferedStream(stream);
    const { version } = await Version.deserialize(buffered);
    switch (version) {
        case 1:
            return AdbFrameBufferV1.deserialize(buffered);
        case 2:
            return AdbFrameBufferV2.deserialize(buffered);
        default:
            throw new Error('Unknown FrameBuffer version');
    }
}
//# sourceMappingURL=framebuffer.js.map