@props([
    'name' => 'file',
    'accept' => '*',
    'multiple' => false,
    'helperText' => 'Pilih atau tarik berkas ke sini',
])

<div {{ $attributes->merge(['class' => 'relux-file-upload']) }}>
    <label class="relux-file-upload__dropzone">
        <input type="file" name="{{ $name }}" accept="{{ $accept }}" @if($multiple) multiple @endif class="relux-file-upload__input" />
        <span class="text-sm font-semibold text-foreground">Unggah Berkas</span>
        <span class="mt-1 text-xs text-muted-foreground">{{ $helperText }}</span>
    </label>
</div>
